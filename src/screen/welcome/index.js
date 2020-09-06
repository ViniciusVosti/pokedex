import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableWithoutFeedback, View, } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { colors, p } from '../../styles';
import { Content,  } from '../../components';

import {

} from '../../actions';

class Welcome extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            page: 1,
            text: "",
        }
    }

    render() {
        return( 
            <Content 
                noScroll
                statusBarColor={colors.secondary}
                search
                logo
            >
 
                

            </Content>
        );
    }
}

const mapStateToProps = state => (
    {
        // pokemons: state.PokemonReducer.pokemons,
    }
)

const functions = {

}

export default connect(mapStateToProps, functions)(Welcome);