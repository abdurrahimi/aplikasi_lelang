import React, {useContext} from 'react'
import { StyleSheet, Image, Text, View, Alert } from 'react-native'
import {Context as UserContext} from '../../services/context/UserContext'
import {Appbar, List} from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import {AsyncStorage} from 'react-native'

const ProfileScreen = ({navigation}) => {
    const {state} = useContext(UserContext)
    const handleLogout = () => {
        AsyncStorage.removeItem('login')
        navigation.replace('Welcome')
    }
    
    const iconBiodata = () => (
        <Image source={require('../../../assets/biodata.png')} style={{resizeMode: 'contain', width: 40, height: 40, alignSelf: 'center'}} />
    )
    const iconAccount = () => (
        <Image source={require('../../../assets/akun.png')} style={{resizeMode: 'contain', width: 40, height: 40, alignSelf: 'center'}} />
    )
    const iconLogout = () => (
        <Image source={require('../../../assets/logout.png')} style={{resizeMode: 'contain', width: 40, height: 40, alignSelf: 'center'}} />
    )
    
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Action icon="ios-person" size={32} />
                <Appbar.Content title={`${state.nama} Profil`} subtitle={state.email}/>
            </Appbar.Header>
            <ScrollView>
                <View style={styles.photoContainer}>
                    <Image source={require('../../../assets/image2.jpg')} style={styles.imageContainer} />
                    <View style={styles.photoItem}>
                        <Image source={require('../../../assets/users.png')} style={{width: 115, height:115}}/>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}> {state.nama} </Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{state.email}</Text>
                    </View>
                </View>
                <View style={styles.menuContainer}>
                    <List.Item style={styles.item}
                        onPress={() => Alert.alert('Fitur Biodata', 'Fitur kelola biodata sedang dalam pengembangan')}
                        title="Biodata"
                        description="Pengaturan biodata"
                        left={() => iconBiodata()}
                        right={props => <List.Icon {...props} icon="ios-arrow-forward" />}
                    />
                    <List.Item style={styles.item}
                        onPress={() => Alert.alert('Fitur Akun', 'Fitur kelola akun sedang dalam pengembangan')}
                        title="Akun"
                        description="Pengaturan akun"
                        left={() => iconAccount()}
                        right={props => <List.Icon {...props} icon="ios-arrow-forward" />}
                    />
                    <List.Item style={styles.item}
                        onPress={handleLogout}
                        title="Keluar"
                        description="Keluar & Logout"
                        left={() => iconLogout()}
                        right={props => <List.Icon {...props} icon="ios-arrow-forward" />}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white'
    },
    photoContainer:{
        backgroundColor: 'khaki',
        alignItems: 'center'
    },
    imageContainer:{
        position: 'absolute',
        width: 450,
        height:300,
        opacity: 0.1
    },
    photoItem:{
        backgroundColor: 'transparent',
        margin: 55,
        alignItems: 'center'
    },
    menuContainer:{

    },
    item:{
        borderBottomWidth: 1, 
        borderColor: 'grey', 
    }
})
