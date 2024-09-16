import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { fetchContacts } from '../utils/api';
import ContactListItem from '../components/ContactListItem';

const keyExtractor = ({ phone }) => phone;

const Contacts = () => {
    // State
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // Load dữ liệu
    useEffect(() => {
        fetchContacts()
            .then((contacts) => {
                setContacts(contacts);
                setLoading(false);
                setError(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
                setError(true);
            });
    }, []);

    // Sort
    const contactsSorted = contacts.sort((a, b) => a.name.localeCompare(b.name));
    const Contacts = ({navigation}) => 
    {
        const renderContact = ({ item }) => {
            const { name, avatar, phone } = item;
            return (
                <ContactListItem
                    name={name}
                    avatar={avatar}
                    phone={phone}
                    onPress={() => navigation.navigate("Profile",{ contacts:item}) }
                />
            );
        };
    }
    // Render
    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator color="blue" size="large" />}
            {error && <Text>Error...</Text>}
            {!loading && !error && (
                <FlatList
                    data={contactsSorted}
                    keyExtractor={keyExtractor}
                    renderItem={renderContact}
                />
            )}
        </View>
    );
};

export default Contacts;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
});
