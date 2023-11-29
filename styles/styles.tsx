import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    head: {
        flex: 1,
        backgroundColor: 'white'
    },

    body: {
        flex: 1,
        backgroundColor: '#F3CA4D30',
    },

    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },

    difficulty: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
        fontStyle: 'italic',
    },
    
    text: {
        fontSize: 16,
        marginTop: 10,
        
    },

    menuText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },

    listQuiz: {
        flex: 1,
        zIndex: -1,
        paddingRight: 15,
        paddingLeft: 15,
    },



    quizBox: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 5,
        padding: 10,
    },

    title: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    titleText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    footer: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
    },

    footerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20,
        marginLeft: 80,
        marginRight: 80,
    },

    footerButton: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#54BF72',
        padding: 10,
        borderRadius: 15,
    },

    enterButton: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#54BF72',
        padding: 15,
        borderRadius: 15,
    },

    menuBar: {
        flex: 0.1,
        backgroundColor: '#54BF72',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },

    menuImg: {

    },

    menuSelect: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    menu: {
        backgroundColor: '#EDEDED',
        borderRadius: 15,
        padding: 10,
        elevation: 3,
        zIndex: 1,
        position: 'absolute',
        alignSelf: 'center',
        top: 30,
        width: 'auto',
        height: 'auto',
        minWidth: 100,
        alignItems: 'center',
    },

      menuItem: {
        padding: 15,
        fontWeight: 'bold',
        color: 'black',
        
      },


    // Landscape
    landscapeHead: {
        flex: 1
    },
    landscapeBody: {
        flex: 1
    },

});