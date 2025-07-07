const Subscription = require('../models/subscription');

exports.getPlans = (req, res, next) => {
  Subscription.getAllPlans((err, plans) => {
    if (err) return next(err);
    res.json({ success: true, plans: plans.map(plan => ({
      id: plan.id,
      name: plan.plan_type === 'premium' ? 'Premium Individual' : 'Free',
      price: plan.price,
      duration: plan.plan_type === 'premium' ? 'monthly' : null,
      features: plan.plan_type === 'premium' ? [
        'Ad-free music',
        'Offline downloads',
        'High quality audio'
      ] : ['Ads', 'Limited skips']
    })) });
  });
};

exports.upgradeSubscription = (req, res, next) => {
  const user_id = req.user && req.user.id;
  Subscription.upgrade(user_id, 'premium', '2099-12-31', (err) => {
    if (err) return next(err);
    res.json({ message: 'Subscription upgraded to premium' });
  });
}; 