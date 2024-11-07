import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderSubMenu from "../../../components/miniComponent/HeaderSubMenu";
import CustomButton from "../../../components/miniComponent/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistoryTransactionGuide } from "../../../redux/statsTransactionGuideSlice";

const WalletGuideScreen = () => {
  const dispatch = useDispatch();
  const tourGuideUserId = useSelector((state) => state.auth.userId);
  const totalBalance = useLocalSearchParams().id;
  const withdrawHistoryData = useSelector(
    (state) => state.statsTransactionGuide.statsGuides
  );

  useEffect(() => {
    dispatch(fetchHistoryTransactionGuide(tourGuideUserId));
  }, [dispatch, tourGuideUserId]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // format date
  const formattedDate = (date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const withdrawHandling = () =>
    router.push({
      pathname: "/homeGuide/withdrawGuide",
      params: { maxAmount: totalBalance },
    });

  const DetailTransItem = ({ item }) => {
    return (
      <View className='gap-5' key={item?.id}>
        {item?.status !== "REJECTED" && (
          <View className='flex-row justify-between'>
            {item.status === "IN" ? (
              <>
                <Text className='font-iregular text-sm text-soil max-w-3/5 flex-shrink'>
                  Pendakian {formattedDate(new Date(item?.createdAt))}
                </Text>
                <Text className='font-ibold text-sm text-successHover'>
                  + {formatCurrency(item?.nominal)}
                </Text>
              </>
            ) : (
              <>
                <Text className='font-iregular text-sm text-soil max-w-3/5 flex-shrink'>
                  Penarikan {formattedDate(new Date(item?.createdAt))}
                </Text>
                <Text className='font-ibold text-sm text-errorHover'>
                  - {formatCurrency(item?.nominal)}
                </Text>
              </>
            )}
          </View>
        )}

        {item.status === "REJECTED" && (
          <View className='flex-row justify-between'>
            <Text className='font-iregular text-sm text-thistle  max-w-3/5 flex-shrink'>
              {item?.description}
            </Text>
            <Text className='font-ibold text-sm text-thistle'>
              {formatCurrency(item?.nominal)}
            </Text>
          </View>
        )}

        <View className='h-[0.3] bg-thistle'></View>
      </View>
    );
  };

  return (
    <SafeAreaView className=' flex-1'>
      <StatusBar backgroundColor={"#503A3A"} barStyle={"light-content"} />
      <View className='flex-1 bg-grayCustom gap-6'>
        <View className='bg-soil pt-10 pb-7 rounded-b-verylarge mb-5'>
          <HeaderSubMenu title={"Dompet"} />
        </View>

        <View className='py-6 gap-7 rounded-verylarge bg-white mx-6'>
          <View className='gap-2 px-6 '>
            <Text className='font-iregular text-sm text-thistle'>
              Total Balance
            </Text>
            <Text className='font-ibold text-3xl text-evergreen'>
              {formatCurrency(totalBalance)}
            </Text>
          </View>

          <View className='flex-row items-center px-6'>
            <CustomButton
              buttonHandling={withdrawHandling}
              customStyle='bg-soil pl-5 pr-4'
              title='Tarik uang'
              iconName='chevron-forward'
            />
          </View>
        </View>

        <View className='rounded-t-verylarge px-6 py-5 bg-white flex-1 gap-5'>
          <View className=' mx-auto items-center justify-center bg-thistle rounded-verylarge w-10 h-1'></View>
          <View className='gap-5'>
            <View className='flex items-center justify-center'>
              <Text className='text-xl font-ibold text-soil'>History</Text>
            </View>

            <View className='h-[0.3] bg-thistle'></View>
          </View>
          <ScrollView>
            <View className='gap-5'>
              {withdrawHistoryData?.map((withdraw) => (
                <DetailTransItem item={withdraw} key={withdraw?.id} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalletGuideScreen;
