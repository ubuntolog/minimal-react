package minimal.react.core;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Booking {
    public Integer id;
    public String name;
    public String email;
    public String phone;
    public Integer salary;
    public Integer age;
    public Integer pets;
    public Integer tenantsNum;
    public Integer space;
    public Integer floor;
    public Integer roomsNum;
    public Integer rentPeriod;

    public Booking() {
        // Needed by Jackson deserialization
    }

    public Booking(Integer id, String name, String email, String phone, Integer salary, Integer age, Integer pets, Integer tenantsNum, Integer space, Integer floor, Integer roomsNum, Integer rentPeriod) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.salary = salary;
        this.age = age;
        this.pets = pets;
        this.tenantsNum = tenantsNum;
        this.space = space;
        this.floor = floor;
        this.roomsNum = roomsNum;
        this.rentPeriod = rentPeriod;
    }

    @JsonProperty
    public Integer getId() { return id; }

    @JsonProperty
    public String getName() {
        return name;
    }

    @JsonProperty
    public String getEmail() {
        return email;
    }

    @JsonProperty
    public String getPhone() {
        return phone;
    }

    @JsonProperty
    public Integer getSalary() {
        return salary;
    }

    @JsonProperty
    public Integer getAge() {
        return age;
    }

    @JsonProperty
    public Integer getPets() {
        return pets;
    }

    @JsonProperty
    public Integer getTenantsNum() {
        return tenantsNum;
    }

    @JsonProperty
    public Integer getSpace() {
        return space;
    }

    @JsonProperty
    public Integer getFloor() {
        return floor;
    }

    @JsonProperty
    public Integer getRoomsNum() {
        return roomsNum;
    }

    @JsonProperty
    public Integer getRentPeriod() {
        return rentPeriod;
    }
}
