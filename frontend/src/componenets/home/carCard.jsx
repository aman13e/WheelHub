import CarSingleCard from "./carSingleCard";
function CarCard({ cars }) {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-4">
      {cars?.map((item) => (
        <CarSingleCard key={item._id} car={item} />
      ))}
    </div>
  );
}

export default CarCard;
