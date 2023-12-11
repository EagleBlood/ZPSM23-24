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
        color: 'black',
        fontFamily: "Chivo-Bold",
    },

    quizHeader: {
        fontSize: 18,
        color: 'black',
        fontFamily: "Chivo-Bold",
    },

    difficulty: {
        fontSize: 16,
        color: 'green',
        fontFamily: "Chivo-Italic",
    },
    
    text: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: "Chivo-Regular",
        
    },

    menuText: {
        fontSize: 16,
        color: 'white',
        fontFamily: "Chivo-Bold",
    },

    listQuiz: {
        flex: 1,
        zIndex: -1,
        paddingRight: 15,
        paddingLeft: 15,
    },

    quizBoxHeader: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 5,
        padding: 10,
    },

    quizBoxHeaderText: {
        fontSize: 24,
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: "Chivo-Bold",
    },

    rightQuizButtons: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-start',
    },

    quizScoreMax: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#54BF72',
        padding: 15,
        borderRadius: 15,
        marginRight: 10,
        fontFamily: "Chivo-Bold",
    },

    quizScore: {
        fontSize: 12,
        color: 'black',
        backgroundColor: '#EDEDED',
        padding: 15,
        borderRadius: 15,
        marginRight: 10,
        fontFamily: "Chivo-Bold",
    },

    quizBox: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
        marginBottom: 20,
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
        fontFamily: "Chivo-Regular",
    },

    footer: {
        fontSize: 16,
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: "Chivo-Bold",
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
        color: 'white',
        backgroundColor: '#54BF72',
        padding: 10,
        borderRadius: 15,
        fontFamily: "Chivo-Bold",
    },

    enterButton: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#54BF72',
        padding: 15,
        borderRadius: 15,
        fontFamily: "Chivo-Bold",
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