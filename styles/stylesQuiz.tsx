import { StyleSheet } from 'react-native';

export const stylesQuiz = StyleSheet.create({
    head: {
        flex: 1,
        backgroundColor: 'white'
    },

    quizTestBox: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 5,
        padding: 10,
        margin: 20,
    },

    quizTestTimerBody: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 80,
    },

    quizTestAnserwsBody: {
        flexDirection: 'column',
        alignItems: 'center',
        alaginContent: 'center',
    },

    quizTestAnserwsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    quizTestTextDiv: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        fontFamily: "Chivo-Regular",
    },
    
    quizTextBox: {
        flex: 1,
        padding: 10,
        fontFamily: "Chivo-Regular",
    },

    quizHeaderTextBox: {
        flex: 1,
        marginTop: 20,
        fontFamily: "Chivo-Regular",
    },

    quizTextHoveredButton: {
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
        borderRadius: 50,
        color: 'white',
        backgroundColor: '#54BF72',
        padding: 20,
        margin: 10,
        fontFamily: "Chivo-Bold",
    },

    quizTextButton: {
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
        borderRadius: 50,
        color: 'black',
        backgroundColor: '#EDEDED',
        padding: 20,
        margin: 10,
        fontFamily: "Chivo-Bold",
    },

    quizText: {
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
        margin: 10,
        color: 'black',
        fontFamily: "Chivo-Regular",
    },


    quizTestHeaderBox: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,

        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },

    quizTestHeaderItems: {
        flexDirection: 'row',
    },

    quizTestHeaderText: {
        fontSize: 24,
        color: 'black',
        fontFamily: "Chivo-Bold",

    },

    quizTestHeaderResignButton: {
        borderRadius: 15,
        backgroundColor: '#BF5454',
        marginLeft: 20,
        marginRight: 20,
    },

    quizTestHeaderResignText: {
        fontSize: 16,
        borderRadius: 50,
        color: 'black',
        paddingLeft: 20,
        paddingRight: 20,
        margin: 10,
        fontFamily: "Chivo-Bold",
        
    },

    quizTestHeaderScoreCount: {
        borderRadius: 15,
        backgroundColor: '#54BF72',
        marginLeft: 20,
        marginRight: 20,
    },

    quizTestHeaderScoreText: {
        fontSize: 16,
        borderRadius: 50,
        color: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        margin: 10,
        fontFamily: "Chivo-Bold",
        
    },

    quizTestTimer: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
    },


    quizQuestionText: {
        fontSize: 16,
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: "Chivo-Regular",
    },
});
