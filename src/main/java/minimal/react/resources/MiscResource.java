package minimal.react.resources;

import minimal.react.core.Booking;
import minimal.react.BackendConfiguration;
import minimal.react.core.Database;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("")
public class MiscResource {
    private static final ch.qos.logback.classic.Logger LOGGER = (ch.qos.logback.classic.Logger) LoggerFactory.getLogger(MiscResource.class);

    private final BackendConfiguration config;

    public MiscResource(BackendConfiguration config) {
        this.config = config;
    }

    @GET
    @Path("/info")
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response getApiInfo() {
        Map map = new HashMap<String, Object>() {{
            this.put("version", config.getVersion());
            this.put("author", "Alexandr Chernov");
        }};
        LOGGER.info("API info was requested");
        return Response.ok(map).build();
    }

    @GET
    @Path("/booking")
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response getAllBookings() throws SQLException {
        Database db = new Database(config);
        LOGGER.info("All bookings were requested");

        List<Booking> foundBookings = db.selectBooking();
        if (foundBookings.size()>0) {
            return Response.ok(foundBookings).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("There are no bookings found").build();
        }
    }

    @GET
    @Path("/booking/{id}")
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response getBooking(@PathParam("id") Integer id) throws SQLException {
        Database db = new Database(config);
        LOGGER.info("Booking was requested");

        List<Booking> foundBookings = db.selectBooking(id);
        if (foundBookings.size()>0) {
            return Response.ok(foundBookings).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("The booking was not found").build();
        }
    }

    @POST
    @Path("/booking")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response makeBooking(@FormDataParam("name") final String name,
                                   @FormDataParam("email") final String email,
                                   @FormDataParam("phone") final String phone,
                                   @FormDataParam("salary") final Integer salary,
                                   @FormDataParam("age") final Integer age,
                                   @FormDataParam("pets") final boolean pets,
                                   @FormDataParam("tenantsNum") final Integer tenantsNum,
                                   @FormDataParam("space") final Integer space,
                                   @FormDataParam("floor") final Integer floor,
                                   @FormDataParam("roomsNum") final Integer roomsNum,
                                   @FormDataParam("rentPeriod") final Integer rentPeriod) {

        LOGGER.info("Trying to add a booking");
        return Response.ok().build();
    }
}
