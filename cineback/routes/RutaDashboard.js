const express=require("express");
const router=express.Router();
const {Contadores,TicketsGenero, TicketsMes, TicketsMontoMes}=require('../controllers/DashboardController');

router.route('/api/dashboardcontadores').get(Contadores);
router.route('/api/dashboardticketsgenero').get(TicketsGenero);
router.route('/api/dashboardticketsmes').get(TicketsMes);
router.route('/api/dashboardmontoticketsmes').get(TicketsMontoMes);

module.exports=router