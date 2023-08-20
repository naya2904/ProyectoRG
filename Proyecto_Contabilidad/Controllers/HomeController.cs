using Microsoft.AspNetCore.Mvc;
using Proyecto_Contabilidad.Models;
using System.Diagnostics;

namespace Proyecto_Contabilidad.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Colaboradores()
        {
            return View();
        }

        public IActionResult Cliente()
        {
            return View();
        }
        public IActionResult Aprobacion()
        {
            return View();
        }
        public IActionResult Reportes()
        {
            return View();
        }
        public IActionResult Cuentas()
        {
            return View();
        }
        public IActionResult Asientos()
        {
            return View();
        }
        public IActionResult Metricas()
        {
            return View();
        }
        public IActionResult Perfil()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}