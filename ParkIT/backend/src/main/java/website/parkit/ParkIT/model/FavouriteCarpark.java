package website.parkit.ParkIT.model;


public class FavouriteCarpark {
    private int id;
    private String name;
    private String address;
    private double latitude;
    private double longitude;


    public FavouriteCarpark(int id, String name, String address, double latitude, double longitude) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }


}