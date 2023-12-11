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
        paddingLeft: 20,
        paddingRight: 20,
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
        fontSize: 24,
        alignSelf: 'center',
        textAlign: 'center',
        margin: 10,
        color: 'black',
        fontFamily: "Chivo-Bold",
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
        color: 'green',
        fontFamily: "Chivo-Regular",
      },
      
      resultsBoxText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
        fontFamily: "Chivo-Regular",
        margin: 10,
      },

      resultsBoxDateText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
        fontFamily: "Chivo-Regular",
      },

      resultsBoxNickText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
        fontFamily: "Chivo-Bold",
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
        fontFamily: "Chivo-Regular",
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
        fontFamily: "Chivo-Regular",
      },

      resultsBoxScoreExpandedText: {
        flex: 0.4,
        fontSize: 16,
        textAlign: 'center',
        padding: 7,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: '#54BF72',
        color: 'white',
        fontFamily: "Chivo-Regular",
      },
      
      resultsBoxTotalExpandedText: {
        flex: 0.5,
        fontSize: 16,
        textAlign: 'center',
        padding: 7,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,    
        backgroundColor: '#EDEDED',
        color: 'black',
        fontFamily: "Chivo-Regular",
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
        alignItems: 'center',
    },

    resultsBottomMenuText: {
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
        color: 'black',
        padding: 7,
        fontFamily: "Chivo-Bold",
        //marginLeft: 20,
        //marginRight: 20,
    },

    selectedMenu: {
        padding: 7,
        borderRadius: 15,
        backgroundColor: '#54BF72',
        color: 'white',
    },

    resultsSearchHeaderText: {
      fontSize: 16,
      alignSelf: 'center',
      textAlign: 'center',
      color: 'black',
      fontFamily: "Chivo-Bold",
  },

    resultsSearchInput: {
      flex: 1,
      fontSize: 16,
      textAlign: 'left',
      color: 'black',
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 30,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      padding: 10,
      paddingLeft: 20,
      fontFamily: "Chivo-Regular",
    },
});
