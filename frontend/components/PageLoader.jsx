import {View , ActivityIndicator} from 'react-native';
import {styles} from "../assets/styles/home.styles";
import {COLORS} from "../constants/colors";
const Pageloader = () =>{
    return (
        <View style = {styles.loadingContainer}>
            <ActivityIndicator size = "large" color = {COLORS.primary}/>
        </View>
    );
};

export default Pageloader;
