import { View, Text, StyleSheet } from "react-native";
const Header = ({ text }) => {
  return (
    <View>
      <Text style={styles.headerText}>{text}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    lineHeight: 21,
    paddingLeft: 29,
    paddingTop: 48,
    paddingBottom: 13,
    color:'#707070',
    fontFamily: "Poppins_600SemiBold",

  },
});
