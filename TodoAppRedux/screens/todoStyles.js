import { StyleSheet } from 'react-native';
    
const tdstyles = StyleSheet.create( {

    container: {
        
        alignSelf: 'stretch',
        backgroundColor : 'white',
        margin: 6,
        padding: 10,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#bcbcbc',
        width: 320,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 7, // For Android

    },
    secondCon : {

        flex : 1,
        flexDirection : 'row',

    },
    thirdCon : {

        flex : 1,
        marginTop : 10,
        marginBottom : 10

    },
    dateView : {

        flex : 1

    },
    statusCon : {

        flex: 2,
        alignItems : 'flex-end'

    },
    idTaskStyle : {

        fontSize : 10,
        marginTop : 13,
        color : 'gray'

    },
    txtStat : {

        fontSize : 12
        
    },
    txtDate : {

        fontSize : 10

    },
    titleFormat : {

        fontSize : 20,
        fontWeight : 'bold'

    },

    // MODAL STYLE PROPERTIES

    centeredView : {

        flex            : 1,
        justifyContent  : 'center',
        alignItems      : 'center',
        backgroundColor : 'rgba(52, 52, 52, 0.3)',

    },
    modalView : {

        width           : 300,
        backgroundColor : 'white',
        borderRadius    : 50,
        padding         : 25,
        alignSelf       : 'center',
        shadowColor     : '#000',
        elevation       : 70,
        flexBasis       :'auto'

    },
    modalBtnX : {

        width : 100

    },
    
    btnX : {

        borderRadius : 10,
        color : 'red'
    
    }


});

export default tdstyles