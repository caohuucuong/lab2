import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import ContactThumbnail from '../../components/ContactThumbnail';
import { fetchContacts } from '../../utils/api';

const Favorites = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchContacts()
        .then(contacts => {
            setContacts(contacts);
            setLoading(false);
            setError(false);
        })
        .catch(e => {
            setLoading(false);
            setError(true);
        });
    }, []);

    const keyExtractor = ({ phone }) => phone;

    const renderFavoriteThumbnail = ({ item }) => {
        const { avatar } = item;
        return (
            <ContactThumbnail
                avatar={avatar}
                onPress={() => navigation.navigate('Profile', { contact: item })}
            />
        );
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" />}
            {error && <Text>Error...</Text>}
            {!loading && !error && (
                <FlatList
                    data={contacts}
                    keyExtractor={keyExtractor}
                    numColumns={3}
                    contentContainerStyle={styles.list}
                    renderItem={renderFavoriteThumbnail}
                />
            )}
        </View>
    );
};

export default Favorites;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
    list: {
        alignItems: 'center',
    },
});


