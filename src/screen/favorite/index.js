import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableWithoutFeedback, View, } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { colors, p } from '../../styles';
import { Content, EmptyScreen, Icon } from '../../components';

import {
    removeFavorite,
} from '../../actions';

import TouchableScale from 'react-native-touchable-scale';

class Favorite extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            
        }
    }

    pokemon = ({ item, index }) => {
        return(
            <TouchableWithoutFeedback onPress={() => {
                Actions.pokemon({ pokemon_name: item.name })
            }}>
                <View key={index} style={[p.mt16, p.mh16, p.bDef, p.bRad16, p.ph8, p.pv4, p.bgcWhite, {}]}>
                    <View key={index} style={[p.row, {}]}>
                        <View style={[p.jCenter,p.aiCenter, p.mr8]}>
                            {item.sprites.front_default  !== null ?
                            <Image source={{ uri: item.sprites.front_default }} style={[{height:80, width:80}]} />
                            :
                            <Image source={require("../../assets/icons/pokeball.png")} style={[{width: 32, height: 32}]} />
                            }
                        </View>
                        <View style={[p.f1]}>
                            <View style={[p.flex,p.mt16, {}]}>
                                <Text style={[p.ffRegular]}>{item.name}</Text>
                            </View>
                            <View style={[p.flex,p.mt4, {}]}>
                                <Text style={[p.ffRegular]}>Abilities: {item.abilities.length}</Text>
                            </View>
                            <View style={[p.flex,p.mt4, {}]}>
                                <Text style={[p.ffRegular]}>Moves: {item.moves.length}</Text>
                            </View>
                        </View>
                        <TouchableScale onPress={() => {
                            this.props.removeFavorite({ name: item.name, index })
                        }}>
                            <View style={[p.jCenter,p.aiCenter, p.p8, {  }]}>
                                <Icon type="FontAwesome5" name="star" size={22} style={[{color: colors.secondary }]} />
                            </View>
                        </TouchableScale>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        return( 
            <Content 
                noScroll
                statusBarColor={colors.secondary}
                menu
                title={"Favorites"}
            >
 
                <FlatList
                    data={this.props.favorites}
                    extraData={this.props.change}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}

                    renderItem={this.pokemon}

                    ListEmptyComponent={() => (
                        <EmptyScreen />
                    )}
                />

            </Content>
        );
    }
}

const mapStateToProps = state => (
    {
        favorites: state.PokemonReducer.favorites,
        change: state.PokemonReducer.change,
    }
)

const functions = {
    removeFavorite,
}

export default connect(mapStateToProps, functions)(Favorite);