import { StyleSheet } from 'react-native';

export const stylesHome = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    
    menuText: {
        fontSize: 30,
        color: 'black',
        fontFamily: "Chivo-Bold",
    },

    menuDeviceText: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: "Chivo-Bold",
    },


    menuTextPlus: {
        backgroundColor: '#93CF46',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
        fontSize: 30,
        color: 'black',
        fontFamily: "Chivo-Bold",
    },
    
    menuTextMinus: {
        backgroundColor: '#CB3232',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
        fontSize: 30,
        color: 'black',
        fontFamily: "Chivo-Bold",
        
    },

    menuBar: {
        flex: 0.2,
        backgroundColor: 'white',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 5,
        zIndex: 2,
        
    },

    menuSelect: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    menuHiddenItems: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        
    },



    itemsContainer: {
        backgroundColor: 'white',
        borderRadius: 30,
        margin: 30,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 5,
        zIndex: 1,
        
    },

    itemsGrid: {
        margin: 15,
        alignItems: 'center',
    },
    
    items: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    item: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#CDA66570',
        borderRadius: 30,
        paddingTop: 35,
        paddingBottom: 35,
        paddingLeft: 25,
        paddingRight: 25,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    itemName: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: "Chivo-Bold",
    },

    itemDesc: {
        fontSize: 20,
        color: 'black',
        fontFamily: "Chivo-Regular",
    },


    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
    },
    modalText: {
        textAlign: "center",
        color: 'black',
        fontSize: 30,
        marginBottom: 15,
    },
    modalInput: {
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 15,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
    },
    buttonClose: {
        backgroundColor: "#CDA665",
        borderRadius: 15,
        padding: 20,
    },
    textStyle: {
        color: "black",
        textAlign: "center",
        fontSize: 20,
    },
});