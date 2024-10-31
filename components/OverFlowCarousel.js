import { Image, Text, View } from "react-native";

import { FlatList } from "react-native";
const OverFlowCarousel = ({
  data,
  title,
  withDescription = false,
  customStyle,
}) => {
  const renderItemWrapper = ({ item }) => {
    return (
      <View
        className={`mr-5 bg-white ${
          withDescription ? "max-h-[203px] rounded-xl" : ""
        }`}>
        <Image
          source={{ uri: item.image }}
          className={`w-[200px] h-[120px] ${
            withDescription ? "rounded-t-xl overscroll-contain" : "rounded-xl"
          }`}
        />
        {withDescription && (
          <Text className="text-[14px] font-bold p-4">{item.description}</Text>
        )}
      </View>
    );
  };

  return (
    <View className={`px-6 ${customStyle ? customStyle : ""}`}>
      <View className="my-[15px] flex justify-between flex-row">
        <Text className="text-[14px] font-bold">{title}</Text>
        <Text className="text-[14px]">Selengkapnya</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItemWrapper}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default OverFlowCarousel;