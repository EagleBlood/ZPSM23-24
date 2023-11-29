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
        marginTop: 10,
        alignSelf: 'center',
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

    quizTextButton: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        borderRadius: 50,
        color: 'white',
        backgroundColor: '#54BF72',
        padding: 20,
        margin: 10,
    },

    quizHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        margin: 10,
        color: 'black',
    },

    quizText: {
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
        margin: 10,
        color: 'black',
    },


    quizTestHeaderBox: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 5,
        justifyContent: 'center',

        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },

    quizTestHeaderItems: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    quizTestHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',

        borderRadius: 50,
        color: 'black',
        paddingLeft: 20,
        paddingRight: 20,
        margin: 10,
        
    },

    quizTestTimer: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
    },

});
