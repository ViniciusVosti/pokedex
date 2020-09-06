import React from 'react';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';

import Drawer from './components/drawer';

import Home from './screen/home';
import Pokemon from './screen/pokemon';
import Welcome from './screen/welcome';
import Favorite from './screen/favorite';

export default props => (
    
    <Router onStateChange={() => { console.log("Tela Atual>>", Actions.currentScene) }}>

        <Scene key="root" hideNavBar >

            <Scene key='welcome' hideDrawerButton component={Welcome} hideNavBar init={true} />

            <Scene 
                drawer
                hideNavBar
                key="drawerMenu"
                contentComponent={Drawer}
                drawerWidth={null}
                drawerPosition='left'
            >

                <Stack key="stack1" hideNavBar>

                    <Scene key='home' hideDrawerButton component={Home} hideNavBar init={true} />

                    <Scene key='pokemon' hideDrawerButton component={Pokemon} hideNavBar />

                    <Scene key='favorite' hideDrawerButton component={Favorite} hideNavBar />
                    
                </Stack>

            </Scene>

        </Scene>
        
    </Router>
); 