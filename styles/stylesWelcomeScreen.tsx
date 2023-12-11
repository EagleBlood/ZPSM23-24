import { StyleSheet } from 'react-native';

export const stylesWelcomeScreen = StyleSheet.create({
    welcomeBox: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 5,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
    },

    welcomeBoxHeaderText: {
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center',
        margin: 10,
        color: 'black',
        fontFamily: "Chivo-Bold",
    },

    welcomeBoxText: {
        fontSize: 16,
        margin: 10,
        color: 'black',
        fontFamily: "Chivo-Regular",
    },

    welcomeCheckBoxView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },

    welcomeCheckBox: {
        alignSelf: 'center',
        textAlign: 'center',
        margin: 10,
    },

    welcomeBoxButtonOn: {
        alignSelf: 'center',
        textAlign: 'center',
        borderRadius: 15,
        backgroundColor: '#54BF72',
        padding: 10,
        margin: 10,
    },

    welcomeBoxButtonOff: {
        alignSelf: 'center',
        textAlign: 'center',
        borderRadius: 15,
        backgroundColor: '#EDEDED',
        padding: 10,
        margin: 10,
    },

    

    welcomeBoxButtonOffText: {
        fontSize: 20,
        color: 'black',
        fontFamily: "Chivo-Bold",
    },

    welcomeBoxButtonOnText: {
        fontSize: 20,
        color: 'white',
        fontFamily: "Chivo-Bold",
    },
   
    
});


