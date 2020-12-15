import React, { Fragment, useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {Context as UserContext} from '../../services/context/UserContext'
import { Appbar, Badge } from 'react-native-paper';
import HeadHome from '../../components/headSection/HeadHome';
import ListMyWinner from '../../components/home/ListMyWinner';

const HomeScreen = () => {
    const {state, UserData} = useContext(UserContext);
    useEffect(() => {
        UserData()
    }, [])

    return (
        <Fragment>
            <Appbar.Header>
                <Appbar.Action size={32} icon="ios-home"/>
                <Appbar.Content title="Beranda" subtitle={`Selamat Datang ${state.nama}`} />
                {/* <Appbar.Action icon="md-notifications-outline" size={35} /> */}
            </Appbar.Header>
            <View style={styles.container}>
                <HeadHome/>
                <View style={styles.homeWelcome}>
                    <Text style={styles.title}>Selamat Datang {state.nama}</Text>
                    <Text style={styles.description}>
                        Aplikasi Lelang Indonesia (ART) adalah platform layanan daring untuk masyarakat indonesia dalam
                        mempermudah proses kegiatan lelang barang.
                    </Text>
                    <Text style={styles.subDescription}>- App Version : 0.7 -</Text>
                </View> 
                {/* <ListMyWinner/> */}
            </View>
        </Fragment>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white',
    },
    homeWelcome:{
        marginVertical: 0,
        marginHorizontal:20
    },
    title:{
        fontWeight:'bold',
        color:'gray',
        fontSize:22
    },
    description:{
        textAlign: 'justify',
        color: 'gray',
        fontSize:16
    },
    subDescription:{
        textAlign: 'justify',
        color: 'gray',
        fontSize:12,
        marginVertical:10
    }

})
