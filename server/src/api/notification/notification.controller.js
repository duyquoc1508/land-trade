import Notification from "./notification.model";

// get notifications of user
export async function getNotifications(req, res, next) {
  try {
    const pageSize = req.query.limit;
    const begin = (req.query.page - 1) * pageSize;
    const { publicAddress } = req.user;
    const notifications = await Notification.find({
      userAddress: publicAddress,
    })
      .lean()
      .sort({ _id: -1 })
      .limit(pageSize)
      .skip(begin);
    return res.status(200).json({ statusCode: 200, data: notifications });
  } catch (error) {
    next(error);
  }
}

/**
 * @dev create notification for TEST.
 */
export async function createNotification(req, res, next) {
  try {
    const notification = await Notification.create(req.body);
    return res.status(201).json({ statusCode: 201, data: notification });
  } catch (error) {
    next(error);
  }
}
