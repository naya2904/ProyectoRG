﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Proyecto_Contabilidad.Controllers
{
    public class SeatController : Controller
    {
        // GET: SeatController
        public ActionResult Index()
        {
            return View();
        }
             
        public ActionResult List()
        {
            return View();
        }

        // GET: SeatController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: SeatController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: SeatController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: SeatController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: SeatController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: SeatController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: SeatController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        public ActionResult CreateDetail(int? id)
        {
            return View(id);
        }

    }
}
