import { StyleSheet, Text, View } from "react-native";
import XIcon from "./XIcon";

type CategoryProps = {
    name: string;
}

export function CategoryItem(props: CategoryProps) {
    const { name } = props;

    return (
        <View style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>{name}</Text>
            <XIcon/>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryButton: {
        backgroundColor: '#c5e6fc',
        borderWidth: 1,
        borderColor: '#3498db',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        marginVertical: 5,
      },
    categoryButtonText: {
        color: '#023b61',
        fontSize: 16,
        fontWeight: 'bold',
      },
  });