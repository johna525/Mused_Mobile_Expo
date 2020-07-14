import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import { Linking } from 'expo';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import _ from 'lodash';
import NewsfeedList from './NewsfeedList';
import { Header, COLLECTION, NEWSFEED, BROWSE_ONLY, ZOOM, COLLECTION_ZOOM, INSTAGRAM, BROWSE } from '../../shared';
import * as API from '../../../services/api';
import DotIndicator from '../../shared/components/Indicators/dot-indicator'
import { ROOT_STORE } from '../../stores';

type Props = {
    navigation: any;
    root: RootStore;
};

type State = {
  redirecting: boolean,
  scrolledToEnd: boolean
};

function NewsfeedHOC(Newsfeed: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props, State> {
      static navigationOptions: ([string]: any) => HashMap<Object> = ({ navigation }) => {
        return {
            header: <Header navigation={navigation} />
        } 
      };      

      state: State = {
        redirecting: false,
        scrolledToEnd: false
      }

      componentDidMount() {
        const { root: { ui, user } } = this.props;
        ui.setNavigation(this.props.navigation);
        setTimeout(() => {
          API.setIdentify(user.userProfile.email);
          API.RegisterEvent("Login", {
            actionType: 'Login',
            email: user.userProfile.email,
            userId: user.userId,
          })
          API.RegisterEvent("Nf-View", {
            actionType: 'View screen',
          })
        }, 1000) 

        Linking.addEventListener('url', this._handleOpenUrl)
        // setTimeout(() => {
        //   this._handleOpenUrl({url: 'musedapp://post?id=68'});
        //   this._handleOpenUrl({url: 'musedapp://styleit?productId=741043595'});
        //   this._handleOpenUrl({url: 'musedapp://new-products?category=all'});
        // }, 4000);        
        this._checkNewUser();
      }

      _checkNewUser = async () => {
        try {
            const isNew = await AsyncStorage.getItem('newUser');
            if (isNew === 'no') {
              const { root: { user: {setNewUser}}} = this.props;
              setNewUser(false)
            }
        } catch (error) {}
      }

      _handleOpenUrl = (event: any) => {
        const { root: { ui: {navigate}, slots: {setSlotNumber}, products, posts } } = this.props;
        let { path, queryParams } = Linking.parse(event.url);
        const { getDetailByProductId, createStyleWithMused, getNewProducts } = products;
        const { getPostById } = posts;
        console.log('deep linking event', event);
        this.setState({redirecting: true});
        switch(path) {
            case 'styleit':
                const productId = queryParams.productId;
                getDetailByProductId(Number(productId)).then((product: any) => {                    
                    const params = {
                        id: productId,
                        img: {uri: product.image}
                    }
                    this.setState({redirecting: false});
                    createStyleWithMused(params);
                    getNewProducts(product.category);
                    setSlotNumber(-1);
                    navigate(BROWSE, ZOOM, {from: 'zoom'});                  
                });
                break;
            case 'new-products':
                const category = queryParams.category;
                getNewProducts(category);
                this.setState({redirecting: false});
                navigate(BROWSE_ONLY, '', {});
                break;
            case 'post':
                const postId = queryParams.id;
                getPostById(postId).then((post: Post) => {
                  this.setState({redirecting: false}, () => {
                    if(post === null) {
                      alert('The post is not available');
                    } else {
                      this._navigateToSpecialPost(post);
                    }                    
                  });
                  
                });
                break;
            default:                
                this.setState({redirecting: false}, () => {
                  console.log('Invalid deep link');
                });
                break;
        }
    }

    _navigateToSpecialPost(post: Post) {
      const { timeAgo, authorProfilePhoto, authorName, slots, postType, productIds, productId } = post;
        if(postType === 'list') {
          const { root: { ui } } = this.props;
          const { navigate } = ui;
          navigate(BROWSE_ONLY, NEWSFEED, {productIds});  
          API.RegisterEvent("Nf-ClickPost", {
            event: 'Click post',
            postType: 'list',
          });
          return;
        } else if(postType === 'product') {
          const { root: { ui, products } } = this.props;
          const { navigate } = ui;
          const { getDetailByProductId } = products;
          getDetailByProductId(productId)
          .then((product: any) => {
            navigate(COLLECTION_ZOOM, NEWSFEED, {product});
          })
          API.RegisterEvent("Nf-ClickPost", {
            event: 'Click post',
            postType: 'product',
          })
          return;
        } else if(postType === 'instagram') {
          API.RegisterEvent("Nf-ClickPost", {          
            event: 'Click post',
            postType: 'Instagram',
          }) 
          let slots: any = [];
          post.slots.map((slot: any) => {
              slots.push({
                date: moment(new Date(post.date)).fromNow(false),
                slot,
                key: String(post.postId) + String(JSON.parse(slot.instagramURL).media_id)
              })
            })   
          this.props.root.ui.navigate(INSTAGRAM, NEWSFEED, {slots});  
          return;
        }
        const params = {
          productIds: slots,
          authorItem: {
              timeAgo,
              authorProfilePhoto,
              authorName
          }
        };
        const { root: { ui, slots: { removeSixthSlot }, products: { getCollection, setFromOutfit } } } = this.props;
        const { navigate } = ui;
        removeSixthSlot();
        setFromOutfit(false);
        getCollection(params.productIds)
        navigate(COLLECTION, NEWSFEED, params);   
        API.RegisterEvent("Nf-ClickPost", {          
          event: 'Click post',
          postType: 'inspire',
        })        
    }
    
    render() {
        const { root: { posts, products } } = this.props;
        const { listOfPosts, listOfRetailerPosts, getPosts } = posts;
        const { getBookmarksByUserId, getCollection, listOfAlternatives, listOfRecentNewProducts } = products;
        return(
          <View style={{flex: 1}}>
            <Newsfeed 
              goToCollection={this._goToCollection}
              goToBrowseDirectly={this._goToBrowseDirectly}
              goToZoomDirectly={this._goToZoomDirectly}
              getPosts={getPosts}
              getCollection={getCollection}
              goToInstagramSlide={this._goToInstagramSlide}
              listOfPosts={listOfPosts}
              listOfRetailerPosts={listOfRetailerPosts}
              getBookmarksByUserId={getBookmarksByUserId}
              onClickRetailerPost={this._onClickRetailerPost}
              listOfAlternatives={listOfAlternatives}
              listOfRecentNewProducts={listOfRecentNewProducts}
              onClickNewProduct={this._onClickNewProduct}
              onViewAllNewProduct={this._onViewAllNewProduct}
              onScroll={(nativeEvent: any) => this.onScroll(nativeEvent)}
            />
            {
              this.state.redirecting && 
              <View style={{position: 'absolute', backgroundColor: 'white', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                <DotIndicator size={6} count={3} />
              </View>
            }            
          </View>
        )
      }

      onScroll(nativeEvent: any) {
        const { root: { posts: {getRetailerPosts}, products: {getNewProducts} } } = this.props;

        const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;    
        // console.log(layoutMeasurement.height + contentOffset.y + ', ' + contentSize.height)
        if(!this.state.scrolledToEnd && (layoutMeasurement.height + contentOffset.y === contentSize.height)) {
          getRetailerPosts();
          getNewProducts('all');
          this.setState({scrolledToEnd: true})
        }
      }

      _goToCollection = (params: any) => {
        const { root: { ui, slots: { removeSixthSlot }, products: { setFromOutfit } } } = this.props;
        const { navigate } = ui;
        removeSixthSlot();
        setFromOutfit(false);
        navigate(COLLECTION, NEWSFEED, params);   
        API.RegisterEvent("Nf-ClickPost", {          
          event: 'Click post',
          postType: 'inspire',
        })       
      }

      _onClickRetailerPost = async (post: RetailerPost) => {
        const { getCollection, setFromOutfit, resetArrayImages } = this.props.root.products;
        setFromOutfit(false)
        await resetArrayImages();
        getCollection(post.slots);
        API.RegisterEvent("Nf-ClickPost", {          
          event: 'Click post',
          postType: 'Retailer',
        });
        this.props.root.ui.navigate(COLLECTION, NEWSFEED, {
          productIds: post.slots,
          from: 'instagram'
        });        
      }

      _onClickNewProduct = (item: Product) => {
        const { root: { ui, products } } = this.props;
        const { navigate } = ui;
        const { getDetailByProductId } = products;
        getDetailByProductId(item.id)
        .then((product: any) => {
          navigate(COLLECTION_ZOOM, NEWSFEED, {product});
        })
        API.RegisterEvent("Nf-ClickPost", {
          event: 'Click post',
          postType: 'New Product',
        })
      }

      _onViewAllNewProduct =  () => {
        const { root: { ui } } = this.props;
        const { navigate } = ui;
        navigate(BROWSE_ONLY, NEWSFEED, {});
        API.RegisterEvent("Nf-ClickPost", {
          event: 'Click post',
          postType: 'View All New Products',
        })
      }

      _goToInstagramSlide = () => {
        API.RegisterEvent("Nf-ClickPost", {          
          event: 'Click post',
          postType: 'Instagram',
        }) 
        // combine all instagram slots
        const { root: { posts } } = this.props;
        const { listOfPosts } = posts;
        let slots: any = [];
        _.reverse(_.sortBy(listOfPosts, "date")).map((post: Post) => {
          if(post.postType === 'instagram') {
            post.slots.map((slot: any) => {
              slots.push({
                date: moment(new Date(post.date)).fromNow(false),
                slot,
                key: String(post.postId) + String(JSON.parse(slot.instagramURL).media_id)
              })
            })            
          }
        })
        this.props.root.ui.navigate(INSTAGRAM, NEWSFEED, {slots});  
      }

      _goToBrowseDirectly = (productIds: any) => {
        const { root: { ui } } = this.props;
        const { navigate } = ui;
        navigate(BROWSE_ONLY, NEWSFEED, {productIds});  
        API.RegisterEvent("Nf-ClickPost", {
          event: 'Click post',
          postType: 'list',
        })   
      }

      _goToZoomDirectly = (productId: number) => {
        const { root: { ui, products } } = this.props;
        const { navigate } = ui;
        const { getDetailByProductId } = products;
        getDetailByProductId(productId)
        .then((product: any) => {
          navigate(COLLECTION_ZOOM, NEWSFEED, {product});
        })
        API.RegisterEvent("Nf-ClickPost", {
          event: 'Click post',
          postType: 'product',
        })
      }
    }
    return NewComp;
  }

export default NewsfeedHOC(NewsfeedList);