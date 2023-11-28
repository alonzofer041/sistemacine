const express=require("express");
const router=express.Router();
const {Contadores,TicketsGenero, TicketsMes, TicketsMontoMes, MontoProductosVendidos, MontoProductosLineaMes}=require('../controllers/DashboardController');

router.route('/api/dashboardcontadores').get(Contadores);
router.route('/api/dashboardticketsgenero').get(TicketsGenero);
router.route('/api/dashboardticketsmes').get(TicketsMes);
router.route('/api/dashboardmontoticketsmes').get(TicketsMontoMes);
router.route('/api/dashboardproductosvendidos').get(MontoProductosVendidos);
router.route('/api/dashboardproductosvendidoslineasmes').get(MontoProductosLineaMes);

module.exports=router