// import React, {useState} from 'react'
// import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { FontAwesome } from '@expo/vector-icons'; 
// //Screens
// import HomeScreen from './home/HomeScreen'
// import ProductScreen from '../screens/product/ProductScreen'
// import ProfileScreen from '../screens/profile/ProfileScreen';

// const {width} = Dimensions.get('screen')
// const IndexScreen = () => {
//     const [page, setPage] = useState(1);

//     const textActive = (text) => (
//         <Text style={{ color:'white', fontWeight: 'bold' }}>{text}</Text>
//     )

//     return (
//         <View style={styles.container}>
//             {
//                 page === 1?
//                     <HomeScreen />:
//                 page === 2?
//                     <ProductScreen/>
//                 :<ProfileScreen/>
//             }
//             {/* TAB NAVIGATION */}
//             <View style={styles.bottomTab}>
//                 <TouchableOpacity onPress={() => setPage(1)}>
//                     <View style={styles.itemTab}>
//                         <FontAwesome name='home' size={25} color={page==1?'white':'darkgrey'} />
//                         {page===1?textActive('Home'):<Text style={styles.itemText}>Home</Text>}
//                     </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => setPage(2)}>
//                     <View style={[styles.itemTab, styles.itemTabProduct]}>
//                         <Image source={require('../../assets/bid-product1.png')} 
//                             style={{resizeMode: 'contain', width: 60, height: 60, alignSelf: 'center'}} 
//                         />
//                         {page===2?textActive('Tab1'):<Text style={styles.itemText}>Tab1</Text>}
//                     </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => setPage(3)}>
//                     <View style={styles.itemTab}>
//                         <FontAwesome name='user' size={25} color={page==3?'white':'darkgrey'} />
//                         {page===3?textActive('Tab1'):<Text style={styles.itemText}>Tab1</Text>}
//                     </View>
//                 </TouchableOpacity>
//             </View>
            
//         </View>
//     )
// }

// export default IndexScreen

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//     },
//     bottomTab:{
//         width: width,
//         backgroundColor: '#303f9f',
//         flexDirection: 'row',
//     },
//     itemTab:{
//         width: width/3,
//         backgroundColor: 'transparent',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: 60
//     },
//     itemTabProduct:{
//         bottom:10
//     },
//     itemText:{
//         color: 'darkgrey'
//     },
//     textIcon:{
//         bottom:15
//     }
// })


import React, {Component } from 'react'
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, StatusBar, Image } from 'react-native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
//Import Component
import HomeScreen from '../screens/home/HomeScreen'
import ProfileScreen from './profile/ProfileScreen';


console.disableYellowBox = true

const {width} = Dimensions.get('window')

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            module: 1
        }
    }
    textActive = (text) => {
        return(
            <Text style={{ color: 'black', fontWeight: 'bold' }}>{text}</Text>
        )
    }
    render() {
        return (
            <View style={{ flex: 1}}>
                <StatusBar hidden={false} backgroundColor='gold' translucent={true} barStyle={'dark-content'}/>
                {
                    this.state.module === 1?
                        <HomeScreen navigation={this.props.navigation}/>
                    :this.state.module === 2?
                        <HomeScreen />
                    :<ProfileScreen navigation={this.props.navigation}/>
                }
                <View style={styles.bottomTab}>
                    <TouchableOpacity onPress={()=>this.setState({module: 1})}>
                        <View style={styles.itemTab}>
                            <Ionicons name='ios-home' size={25} color={this.state.module==1?'black':'grey'} />
                            {this.state.module==1?this.textActive('Home'):<Text style={styles.itemText}>Beranda</Text>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Product')}>
                        <View style={[styles.itemTab,styles.itemTabSubmission]}>
                            {/* <Ionicons name='ios-paper' size={32} color={this.state.module==3?'white':'cornsilk'} style={{ elevation:8 }}/> */}
                            <Image source={require('../../assets/cash-in.png')} 
                                style={{resizeMode: 'contain', width: 75, height: 75, alignSelf: 'center'}} 
                            />
                            {<Text style={{ color:'grey', fontWeight: 'bold', fontSize:12, bottom:5 }}>Bid Produk</Text>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({module: 3})}>
                        <View style={styles.itemTab}>
                            <FontAwesome5 name='user-cog' size={21} color={this.state.module==3?'black':'grey'} />
                            {this.state.module==3?this.textActive('Profil'):<Text style={styles.itemText}>Profil</Text>}
                        </View>
                    </TouchableOpacity>
                    

                </View>
            </View>
        )
    }
}

export default index

const styles = StyleSheet.create({
    bottomTab: {
        width: width,
        backgroundColor: 'khaki',
        flexDirection: 'row',
        elevation: 9,
        shadowOpacity: 0.9,
        borderTopColor: 'red',
        shadowRadius: 70
    },
    itemTab: {
        width: width/3,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        
    },
    itemText:{
        color: 'grey'
    },
    itemTabSubmission:{
        bottom:20
    },
    textIcon: {
        color: 'white',
    }
})