import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableWithoutFeedback, View, } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { colors, p } from '../../styles';
import { Content, EmptyScreen, Icon } from '../../components';

import {
    getPokemons,
    insertFavorite,
    removeFavorite,
} from '../../actions';
import TouchableScale from 'react-native-touchable-scale';

class Home extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            page: 0,
            text: "",
        }
    }

    componentDidMount = () => {
        this.init(0)
    }

    init = (page = 0) => {
        this.setState({ page } , () => {
            this.props.getPokemons({ page, text: this.state.text.toLowerCase() })
        })
    }

    onEndReached = () => {
        if((this.props.pokemons.length % global.config.offset) !== 0 || this.props.loading_more) return

        this.init(this.state.page + 1);
    }

    filterText = (text) => {
        this.setState({ text }, () => {
            if(!this.timeout){
                this.timeout = null;
                clearTimeout(this.timeout);
            }
            clearTimeout(this.timeout);
            
            this.timeout = setTimeout(()=>{
                this.init();
            },850)
        });
    }



    pokemon = ({ item, index }) => {
        return(
            <TouchableWithoutFeedback onPress={() => {
                Actions.pokemon({ pokemon_name: item.name })
            }}>
                <View key={index} style={[p.row, p.mt16, p.mh16, p.bDef, p.bRad16, p.ph8, p.pv4, p.bgcWhite,]}>
                    <View style={[p.jCenter,p.aiCenter, p.mr8]}>
                        <Image source={require("../../assets/icons/pokeball.png")} style={[{width: 32, height: 32}]} />
                    </View>
                    <View style={[p.jCenter,p.flex, {}]}>
                        <Text style={[p.ffRegular]}>{item.name}</Text>
                    </View>
                    <TouchableScale onPress={() => {
                        if(item.fav === true){
                            this.props.removeFavorite({ name: item.name, index })
                        }else{
                            this.props.insertFavorite({ page:0, text: item.name, index })
                        }
                    }}>
                        <View style={[p.jCenter,p.aiCenter, p.p8, {  }]}>
                            <Icon type="FontAwesome5" name="star" size={22} style={[{color: item.fav === true ? colors.secondary : colors.grey }]} />
                        </View>
                    </TouchableScale>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    listEmptyComponent = () => {
        if(!this.props.loading){
            return(
                <EmptyScreen />
            )
        }
        return(
            <View />
        )
    }

    footer = () => {
        if(this.props.loading_more){
            return(
                <View style={[p.mt16, p.mb32]}>
                    <ActivityIndicator animating={this.props.loading_more} color={colors.secondary} size={'large'} />
                </View>
            )
        }
        else{
            return(
                <View />
            )
        }
    }

    render() {
        return( 
            <Content 
                noScroll
                statusBarColor={colors.secondary}
                search
                logo
                menu
                searchvalue={this.state.text}
                onChangeSearch={(c) => this.setState({ text: "" }, () => this.init())}
                searchOnChangeText={(text) => this.filterText(text)}
            >
 
                <FlatList
                    data={this.props.pokemons}
                    extraData={this.props.change}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}

                    renderItem={this.pokemon}

                    refreshing={this.props.loading}
                    onRefresh={() => this.init()}

                    onEndReachedThreshold={0.05}
                    onEndReached={() => this.onEndReached()}
                    ListEmptyComponent={this.listEmptyComponent}

                    ListFooterComponent={this.footer}
                />

            </Content>
        );
    }
}

const mapStateToProps = state => (
    {
        pokemons: state.PokemonReducer.pokemons,
        change: state.PokemonReducer.change,
        
        loading: state.PokemonReducer.loading,
        loading_more: state.PokemonReducer.loading_more,
    }
)

const functions = {
    getPokemons,
    insertFavorite,
    removeFavorite,
}

export default connect(mapStateToProps, functions)(Home);