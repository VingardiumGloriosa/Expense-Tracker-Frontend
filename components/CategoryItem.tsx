import { Text, View } from "react-native";

type CategoryProps = {
    name: string;
}

export function CategoryItem(props: CategoryProps) {
    const { name } = props;

    return (
        <View>
            <Text>{name}</Text>
        </View>
    )
}