package minimal.react.core;

import minimal.react.BackendConfiguration;
import minimal.react.resources.MiscResource;
import org.h2.tools.DeleteDbFiles;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class Database {
    private static final ch.qos.logback.classic.Logger LOGGER = (ch.qos.logback.classic.Logger) LoggerFactory.getLogger(MiscResource.class);
    private static final String dbName = "home";
    private static final String connectionPrefix = "jdbc:h2:";
    private static String dbFolder = "";
    private static String dbUser = "";
    private static String dbPassword = "";

    public Database(BackendConfiguration params) {
        dbFolder = params.getDbFolder();
        dbUser = params.getDbUser();
        dbPassword = params.getDbPassword();
    }

    public void RemoveDB() throws SQLException {
        DeleteDbFiles.execute(dbFolder, dbName, true);
    }

    public static void createBookingTable() throws SQLException {
        Connection connection = getDBConnection();
        Statement stmt = null;
        try {
            connection.setAutoCommit(false);
            stmt = connection.createStatement();
            stmt.execute("CREATE TABLE booking(id int auto_increment primary key, " +
                                                    "name varchar(255), " +
                                                    "email varchar(100), " +
                                                    "phone varchar(25), " +
                                                    "salary int, " +
                                                    "age int, " +
                                                    "pets bit, " + // 0 - has no pets, 1 - has pets
                                                    "tenantsNum int, " +
                                                    "space int, " + // square meters
                                                    "floor int, " +
                                                    "roomsNum int, " +
                                                    "rentPeriod int" + // in months, 0 - cannot tell
                                                ")");
            stmt.close();
            connection.commit();
        } catch (SQLException e) {
            LOGGER.error(e.getLocalizedMessage());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            connection.close();
        }
    }

    public static void addBooking(String name, String email, String phone, Integer salary, Integer age, Integer pets,
                                  Integer tenantsNum, Integer space, Integer floor, Integer roomsNum, Integer rentPeriod) throws SQLException {
        Booking b = new Booking();
        b.name = name;
        b.email = email;
        b.phone = phone;
        b.salary = salary;
        b.age = age;
        b.pets = pets;
        b.tenantsNum = tenantsNum;
        b.space = space;
        b.floor = floor;
        b.roomsNum = roomsNum;
        b.rentPeriod = rentPeriod;
        addBooking(b);
    }

    public static void addBooking(Booking b) throws SQLException {
        Connection connection = getDBConnection();
        try {
            connection.setAutoCommit(false);
            String queryText = "INSERT INTO booking(name, email, phone, salary, age, pets, tenantsNum, space, floor, roomsNum, rentPeriod) " +
                    "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            PreparedStatement statement = connection.prepareStatement(queryText);
            statement.setString(1, b.name);
            statement.setString(2, b.email);
            statement.setString(3, b.phone);
            statement.setInt(4, b.salary);
            statement.setInt(5, b.age);
            statement.setInt(6, b.pets);
            statement.setInt(7, b.tenantsNum);
            statement.setInt(8, b.space);
            statement.setInt(9, b.floor);
            statement.setInt(10, b.roomsNum);
            statement.setInt(11, b.rentPeriod);
            statement.executeUpdate();
            statement.close();

            connection.commit();
        } catch (SQLException e) {
            LOGGER.error(e.getLocalizedMessage());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            connection.close();
        }
    }

    public static void populateBookingTable() throws SQLException {
        addBooking("John Smith", "john@smith.com", "1234567", 1, 25, 1, 1, 27, 1, 2, 6);
        addBooking("Darth Vader", "darth@empire.org", "1234567", 3, 45, 0, 2, 150, 5, 4, 0);
        addBooking("Luke Skywalker", "luke@skywalker.com", "911", 2, 27, 1, 3, 55, 4, 3, 2);
        addBooking("Leia Organa", "leia@organa.com", "3454566", 1, 26, 0, 1, 35, 2, 2, 7);
        addBooking("Han Solo", "han@solo.com", "111111", 3, 29, 1, 2, 45, 3, 3, 12);
    }

    public static List<Booking> selectBooking() throws SQLException {
        return selectBooking(-1);
    }

    public static List<Booking> selectBooking(Integer id) throws SQLException {

        List<Booking> selectedBooking = new ArrayList<>();
        Connection connection = getDBConnection();
        Statement stmt = null;
        try {
            connection.setAutoCommit(false);
            stmt = connection.createStatement();
            String where = "";
            if (id >-1) {
                where = " WHERE (id = '" + id.toString() + "')";
            }

            ResultSet rs = stmt.executeQuery("SELECT * FROM booking"+where);

            while (rs.next()) {
                Booking currentResult = new Booking();

                currentResult.id = rs.getInt("id");
                currentResult.name = rs.getString("name");
                currentResult.email = rs.getString("email");
                currentResult.phone = rs.getString("phone");
                currentResult.salary = rs.getInt("salary");
                currentResult.age = rs.getInt("age");
                currentResult.pets = rs.getInt("pets");
                currentResult.tenantsNum = rs.getInt("tenantsNum");
                currentResult.space = rs.getInt("space");
                currentResult.floor = rs.getInt("floor");
                currentResult.roomsNum = rs.getInt("roomsNum");
                currentResult.rentPeriod = rs.getInt("rentPeriod");

                selectedBooking.add(currentResult);
            }
            stmt.close();
            connection.commit();
        } catch (SQLException e) {
            LOGGER.error(e.getLocalizedMessage());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            connection.close();
        }

        return selectedBooking;
    }

    public static boolean doesDBExist() {
        boolean exists;
        try {
            Connection dbConnection = DriverManager.getConnection(connectionPrefix + dbFolder + dbName + ";IFEXISTS=TRUE", dbUser, dbPassword);
            dbConnection.close();
            exists = true;
        } catch(Exception e) {
            exists = false;
        }
        return exists;
    }

    private static Connection getDBConnection() {
        Connection dbConnection = null;
        try {
            Class.forName("org.h2.Driver");
        } catch (ClassNotFoundException e) {
            LOGGER.error(e.getMessage());
        }
        try {
            dbConnection = DriverManager.getConnection(connectionPrefix + dbFolder + dbName, dbUser, dbPassword);
            return dbConnection;
        } catch (SQLException e) {
            LOGGER.error(e.getMessage());
        }

        return dbConnection;
    }

}

