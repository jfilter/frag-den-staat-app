import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import { commonNavigationOptions, iconColor, iconSize } from './styles';
import FoiRequestsDetailsScreen from '../containers/foiRequests/FoiRequestsDetailsScreen';
import FoiRequestsIntroScreen from '../containers/foiRequests/FoiRequestsIntroScreen';
import FoiRequestsMasterScreen from '../containers/foiRequests/FoiRequestsMasterScreen';
import FoiRequestsPublicBodyScreen from '../containers/foiRequests/FoiRequestsPublicBodyScreen';
import I18n from '../i18n';
import PdfViewer from '../components/screens/PdfViewer';
import navigateOnce from '../utils/navigateOnce';

const FoiRequestsNavigator = StackNavigator(
  {
    FoiRequestsMaster: { screen: FoiRequestsMasterScreen },
    FoiRequestsDetails: { screen: FoiRequestsDetailsScreen },
    FoiRequestsPdfViewer: { screen: PdfViewer },
    FoiRequestsPublicBody: { screen: FoiRequestsPublicBodyScreen },
    FoiRequestsIntro: { screen: FoiRequestsIntroScreen },
  },
  {
    navigationOptions: {
      ...commonNavigationOptions,
      tabBarLabel: I18n.t('requests'),
      tabBarIcon: () => <Icon size={iconSize} color={iconColor} name="list" />,
    },
    // https://github.com/react-navigation/react-navigation/issues/3217
    // transitionConfig: () => ({
    //   screenInterpolator: props => {
    //     // Transitioning to screen (navigate)
    //     if (props.scene.route.routeName === 'FoiRequestsIntro') {
    //       return CardStackStyleInterpolator.forFade(props);
    //     }

    //     const last = props.scenes[props.scenes.length - 1];

    //     // Transitioning from screen (goBack)
    //     if (last.route.routeName === 'FoiRequestsIntro') {
    //       return CardStackStyleInterpolator.forFade(props);
    //     }

    //     return CardStackStyleInterpolator.forHorizontal(props);
    //   },
    // }),
  }
);

FoiRequestsNavigator.router.getStateForAction = navigateOnce(
  FoiRequestsNavigator.router.getStateForAction
);

export default FoiRequestsNavigator;
