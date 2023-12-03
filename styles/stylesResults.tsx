import {StyleSheet} from 'react-native';

export const stylesResults = StyleSheet.create({

    resultsHeaderBox: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 10,
        elevation: 5,
        padding: 10,
        marginTop: 20,
        marginBottom: 30,
        marginRight: 20,
        marginLeft: 20
    },

    resultsBox: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 10,
        elevation: 5,
        padding: 15,
        marginTop: 0,
        marginBottom: 20,
        marginRight: 20,
        marginLeft: 20
    },

    resultsBoxHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        margin: 10,
        color: 'black'
    },

    resultsBoxView: {
        flex: 1,
        flexDirection: 'column',
      },


      resultsBoxItems: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      
      resultsBoxTypeText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
        color: 'green'
      },
      
      resultsBoxText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
        color: 'black'
      },
      
      resultsBoxScoreText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        padding: 7,
        borderRadius: 15,
        backgroundColor: '#54BF72',
        color: 'white',
        margin: 10,
      },
      
      resultsBoxTotalText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        padding: 7,
        borderRadius: 15,
        backgroundColor: '#EDEDED',
        color: 'black',
        margin: 10,
      },

    /*resultsBottomMenu: {   //OLD sticking to bottom menu option
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 10,
        elevation: 5,
        padding: 10,
        margin: 20
    },*/


    resultsBottomMenuItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
    },

    resultsBottomMenuText: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        color: 'black',
        padding: 10,
        marginLeft: 20,
        marginRight: 20
    },

    selectedMenu: {
        padding: 7,
        borderRadius: 15,
        backgroundColor: '#54BF72',
        color: 'white'
    }
});
