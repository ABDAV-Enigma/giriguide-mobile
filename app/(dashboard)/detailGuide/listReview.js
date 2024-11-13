import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ReviewGuideCard from "../../../components/ReviewGuideCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTourGuideReview } from "../../../redux/guideReviewSlice";
import { fetchTourGuideById } from "../../../redux/tourGuideSlice";
import CustomNotFound from "../../../components/miniComponent/CustomNotFound";

export default function ListReviewGuideScreen() {
  const dispatch = useDispatch();

  const { tourGuideId } = useLocalSearchParams();
  // const tourGuideId = searchParams.get("tourGuideId");

  const tourGuideReview = useSelector(
    (state) => state.tourGuideReview.reviews?.data
  );
  const tourGuideData = useSelector((state) => state.tourGuide.tourGuide);

  // console.log("-----id-----", tourGuideId);
  // console.log("-----status-----", state.tourGuide.isLoading);
  // console.log("----------", tourGuideReview);

  useEffect(() => {
    if (tourGuideId) {
      dispatch(fetchTourGuideReview({ id: tourGuideId }));
      dispatch(fetchTourGuideById(tourGuideId));
    }
  }, [dispatch, tourGuideId]);

  const formattedDate = (date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <ScrollView className='flex-1' style={{ backgroundColor: "#f8f8f8" }}>
      <SafeAreaView>
        {/* Header */}
        <Text className='text-lg text-center mt-5 text-soil font-ibold'>
          Ulasan ({tourGuideData?.totalReview})
        </Text>
        <TouchableOpacity
          className='bg-ivory w-[30] h-[30] border border-soil absolute top-14 left-6 z-10 items-center justify-center rounded-full'
          onPress={() => router.back()}
        >
          <View className='justify-center items-center'>
            <Ionicons
              name={"chevron-back"}
              size={15}
              color={"#503A3A"}
              // onPress={() => router.back()}
            />
          </View>
        </TouchableOpacity>

        {/* list */}
        <ScrollView>
        <View>
          {tourGuideReview?.length > 0 ? (
            tourGuideReview?.map((ulasan) => (
              <ReviewGuideCard
                key={ulasan?.id}
                reviewerName={ulasan?.customerName}
                date={formattedDate(new Date(ulasan?.createdAt))}
                usePorter={ulasan?.usePorter}
                reviewText={ulasan?.review}
                rating={ulasan?.rating}
                imageUser={ulasan?.customerImage}
              />
            ))
          ) : (
            <CustomNotFound
              title={"Belum ada review untuk tour guide ini"}
              customStyle={"mt-24"}
            />
          )}
        </View>

        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
}
