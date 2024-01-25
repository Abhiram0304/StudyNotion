export default function GetAvgRating(rating) {
    if(!rating || rating.length == 0){
        return 1;
    }

    let avgRating = rating?.reduce((acc,curr) => acc += curr.rating,0);

    avgRating = Math.round(avgRating / rating.length);

    return avgRating;
}