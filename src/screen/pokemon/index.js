import React, { Component } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableWithoutFeedback, View, ImageBackground, ActivityIndicator, } from 'react-native';

import { colors, p } from '../../styles';
import { Content, LoadingScreen } from '../../components';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    getPokemon,
} from '../../actions';

import Carousel, { Pagination } from 'react-native-snap-carousel';

class Pokemon extends Component {

    constructor(props) {
        super(props)

        this.state = {
            page: 1,
            text: "",
            index_atual: 0,
            index_tab: 0,
        }
    }

    componentDidMount = () => {
        this.init()
    }

    init = (page = 1) => {
        this.props.getPokemon({ text: this.props.pokemon_name })
    }


    renderSprites = ({ item, index }) => {
        return(
            <ImageBackground source={require("../../assets/images/bgc/grass.png")} style={{ height: 180 }}>
                <View style={[p.aiCenter,{}]}>
                    {item[1] === null ?
                    <View style={[p.jCenter, p.aiCenter, { width: 240, height: 140 }]}>
                        <Text style={[p.ffRegular, p.tCenter]}>Image not found</Text>
                    </View>
                    :
                    <Image source={{ uri: item[1] }} style={[{ width: 240, height: 140 }]} resizeMode='contain' />
                    }
                    <View style={[p.mv8]}>
                        <Text style={[p.ffRegular]}>{item[0]}</Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    renderStats = ({ item, index }) => {
        return(
            <View style={[p.mb4]}>
                <Text style={[p.ffRegular, p.fsSmall]}>{item.stat.name}: {item.base_stat}</Text>
            </View>
        )
    }

    renderMoves = ({ item, index }) => {
        return(
            <View style={[p.mb4]}>
                <Text style={[p.ffRegular, p.fsSmall]}>{item.move.name}</Text>
            </View>
        )
    }

    renderTab = (index_tab=0, nome="") => {
        return(
            <TouchableWithoutFeedback onPress={() => {
                this.setState({ index_tab })
            }}>
                <View style={[p.f1, p.jCenter, p.aiCenter, p.pb4, p.pt8, index_tab === this.state.index_tab ? p.bgcSecondaryLight : p.bgcWhite]}>
                    <Text style={[p.ffRegular, p.fsSmall]}>{nome}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        let pokemon = this.props.pokemon
        let index_tab = this.state.index_tab
        return (
            <Content
                statusBarColor={colors.secondary}
                title={"Details"}
                bodyStyle={[p.p16]}
            >
                {!this.props.loading_pokemon ?
                <View>
                    <View style={[p.brad16, { height: 180 }]}>
                        <Carousel
                            autoplay
                            autoplayDelay={5000}
                            autoplayInterval={5000}

                            data={Object.entries(pokemon.sprites).slice(0,8)}
                            renderItem={this.renderSprites}
                            
                            sliderWidth={Dimensions.get('window').width - 32}
                            itemWidth={Dimensions.get('window').width - 32}
                            layout={'tinder'}
                            onSnapToItem={(i) => {
                                this.setState({ index_atual: i })
                            }}
                            
                        />    
                    </View>

                    <View style={{  }}>
                        <Pagination
                            activeDotIndex={this.state.index_atual}
                            dotsLength={Object.entries(pokemon.sprites).slice(0,8).length}
                            dotColor={colors.secondary}
                            containerStyle={[p.pv16, {}]}
                        />
                    </View>

                    <View style={[p.mt16]}>
                        <View style={[p.mb8, p.aiCenter]}>
                            <Text style={[p.ffRegular]}>Basic information</Text>
                        </View>
                        <Text style={[p.ffRegular, p.fsSmall]}>Name:{pokemon.name}</Text>
                        <Text style={[p.ffRegular, p.fsSmall]}>Height:{pokemon.height}</Text>
                        <Text style={[p.ffRegular, p.fsSmall]}>Weight: {pokemon.weight}</Text>
                        <Text style={[p.ffRegular, p.fsSmall]}>Base experience: {pokemon.weight}</Text>
                    </View>

                    <View style={[p.mt16]}>
                        <View style={[p.row, { }]}>
                            {this.renderTab(0, "Stats")}
                            {this.renderTab(1, "Moves")}
                        </View>
                    </View>

                    <View style={[{ borderWidth: 1, borderColor: colors.secondary}]}>
                        <View style={[p.mt12, p.ph16]}>
                            <View style={[]}>
                                <FlatList
                                    data={index_tab === 0 ? pokemon.stats : pokemon.moves}
                                    keyExtractor={(item, index) => index}
                                    renderItem={index_tab === 0 ? this.renderStats : this.renderMoves}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={[p.mb32]} />
                </View>
                :
                <LoadingScreen />
                }

            </Content>
        );
    }
}

const mapStateToProps = state => (
    {
        pokemon: state.PokemonReducer.pokemon,
        loading_pokemon: state.PokemonReducer.loading_pokemon,
        change_pokemon: state.PokemonReducer.change_pokemon,
    }
)

const functions = {
    getPokemon
}

export default connect(mapStateToProps, functions)(Pokemon);