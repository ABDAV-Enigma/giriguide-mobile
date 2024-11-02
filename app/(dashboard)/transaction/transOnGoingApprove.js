import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderSubMenu from '../../../components/miniComponent/HeaderSubMenu'
import MinimizeCard from '../../../components/miniComponent/MinimizeCard'
import DetailTourGuideGunungCard from '../../../components/transaksiCustomer/DetailTourGuideGunungCard'
import DetailHikers from '../../../components/transaksiCustomer/DetailHikers'
import FixedHarga from '../../../components/bookingTourGuide/FixedHarga'
import CatatanUntukTourGuide from '../../../components/miniComponent/CatatanUntukTourGuide'
import TipsMeetingWithGuide from '../../../components/transaksiCustomer/TipsMeetingWithGuide'
import { ScrollView } from 'react-native';
import moment from 'moment'
import CustomToastWarning from '../../../components/miniComponent/CustomToastWarning'

const TransactionOnGoingApproveScreen = () => {
    const startDate = new Date()
    const endDate = new Date("2024-11-03T18:55:00")

    const dummy = moment(new Date()).format('DD MMM YYYY')

    const continueHandling = () => {

    }

    const calculateTimeDifference = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
      
        const diffMs = end - start;

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
        let result = '';
        if (days > 0) result += `${days} hari `;
        if (hours > 0) result += `${hours} jam `;
        if (minutes > 0) result += `${minutes} menit`;
      
        return result.trim();
    }

    return (
        <SafeAreaView className="flex-1">
            <StatusBar barStyle="light-content" backgroundColor="#503A3A" />

            <View className="flex-1">
                <View className="bg-soil pb-7 rounded-b-verylarge mb-5">
                    <HeaderSubMenu title={"Detail Transaksi"} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} className="gap-6" contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}>
                    <View className="px-6">
                        <CustomToastWarning 
                            message={"Sedang menunggu konfirmasi dari tour guide"}
                        />
                    </View>

                    <View className="px-6 mt-6">
                        <MinimizeCard 
                            title={"Sisa Waktu Tunggu Approve"}
                            data={calculateTimeDifference(startDate, endDate)}
                            icon={'clock'}
                        />
                    </View>

                    <View className="px-6 mt-6">
                        <MinimizeCard 
                            title={"Tanggal Pendakian"}
                            data={`${dummy} s/d ${dummy}`}
                            icon={'mountain-sun'}
                        />
                    </View>

                    <View className="px-6 mt-6">
                        <DetailTourGuideGunungCard />
                    </View>

                    <View className="px-6 mt-6">
                        <DetailHikers />
                    </View>

                    <View className="mt-6 gap-5">
                        <Text className="font-ibold text-soil ml-6">Detail Harga</Text>
                        <FixedHarga />
                    </View>

                    <View className="mt-6">
                        <CatatanUntukTourGuide 
                            isEditable={false}
                            title={"Catatan kepada tour guide"}
                        />
                    </View>

                    <View className="mt-6">
                        <TipsMeetingWithGuide />
                    </View>
                </ScrollView>
                
            </View>
        </SafeAreaView>
    )
}

export default TransactionOnGoingApproveScreen