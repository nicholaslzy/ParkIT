package website.parkit.ParkIT.model;

import java.awt.Image;
import java.util.ArrayList;
import java.util.List;

public class Driver extends Account {

    private String name;
    private String phone;
    private String contactNumber;
    private Image profilePhoto;
    private ParkingSession activeSession;
    private List<FavouriteCarpark> favoriteCarparkList;
    private List<ParkingHistory> parkingHistoryList;


    // Constructor
    public Driver(String email, String password, String name, String contactNumber, Image profilePhoto) {
        super(email, password);
        this.name = name;
        this.contactNumber = contactNumber;
        this.profilePhoto = profilePhoto;
        this.favoriteCarparkList = new ArrayList<FavouriteCarpark>();
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public Image getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(Image profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    /**
     * Adds a car park to the driver's list of favorite car parks.
     *
     * @param carpark the car park to be added to favorites
     */
    public void setFavoriteCarpark(Carpark carpark) {
        FavouriteCarpark favouriteCarpark = new FavouriteCarpark();
        // TODO: Initialize favouriteCarpark with details from the provided carpark.
        this.favoriteCarparks.add(favouriteCarpark);
    }

    /**
     * Returns the list of favorite car parks.
     *
     * @return a list of favorite car parks
     */
    public List<Parking> getFavoriteCarparks() {
        return favoriteCarparks;
    }

    /**
     * Removes the specified car park from the favorites.
     *
     * @param carpark the car park to remove
     * @return true if the car park was found and removed, false otherwise
     */
    public boolean removeFavouriteCarpark(Carpark carpark){
        // TODO: Removes the specified car park from the favorites.
        return true;
    }

    /**
     * Starts a new parking session.
     * This creates a ParkingSession object, sets its start time to the current time,
     * and assigns it to the activeSession.
     */
    public void startSession() {
        activeSession = new ParkingSession();
        activeSession.setStartTime(LocalDateTime.now());
    }

    /**
     * Ends the current parking session.
     * Set the end time on the active session, create a ParkingHistory object,
     * add the session to parkingHistoryList, and sets the activeSession to NULL.
     *
     * @return true if session was ended successfully. false otherwise
     */
    public boolean endSession() {

        if (activeSession == null) {
            return false;
        }

        // Create a ParkingHistory object with the session details.
        // TODO


        // Add the session to the parkingHistoryList
        // parkingHistoryList.add(history);

        // Remove the active session by setting it to null
        activeSession = null;

        return true;
    }
}
