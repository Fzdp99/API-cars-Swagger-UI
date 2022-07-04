const express = require("express");
const controllers = require("../app/controllers");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const apiRouter = express.Router();

// API swagger
apiRouter.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// akun
apiRouter.post("/user/login", controllers.userController.login);
apiRouter.post("/user", controllers.userController.create);

//member to admin / admin to member
apiRouter.get(
  "/user/member_to_admin/:id",
  controllers.userController.authorize,
  controllers.userController.memberToAdmin
);
apiRouter.get(
  "/user/admin_to_member/:id",
  controllers.userController.authorize,
  controllers.userController.adminToMember
);

// user
apiRouter.get(
  "/user/status",
  controllers.userController.authorize,
  controllers.userController.statusLoginUser
);
apiRouter.get(
  "/user",
  controllers.userController.authorize,
  controllers.userController.list
);
apiRouter.put(
  "/user/:id",
  controllers.userController.authorize,
  controllers.userController.update
);
apiRouter.post(
  "/user/updateProfile",
  controllers.userController.authorize,
  controllers.userController.updateProfile
);
apiRouter.get(
  "/user/:id",
  controllers.userController.authorize,
  controllers.userController.show
);
apiRouter.delete(
  "/user/:id",
  controllers.userController.authorize,
  controllers.userController.destroy
);

// car
apiRouter.get(
  "/car",
  controllers.userController.authorize,
  controllers.carController.list
);
apiRouter.post(
  "/car",
  controllers.userController.authorize,
  controllers.carController.create
);
apiRouter.get(
  "/car/history",
  controllers.userController.authorize,
  controllers.carController.history
);
apiRouter.put(
  "/car/:id",
  controllers.userController.authorize,
  controllers.carController.update
);
apiRouter.get(
  "/car/:id",
  controllers.userController.authorize,
  controllers.carController.show
);
apiRouter.delete(
  "/car/:id",
  controllers.userController.authorize,
  controllers.carController.destroy
);

apiRouter.get("/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

// apiRouter.use(controllers.onLost);
// apiRouter.use(controllers.onError);

module.exports = apiRouter;
