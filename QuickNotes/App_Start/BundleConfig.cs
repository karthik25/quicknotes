﻿using System.Web.Optimization;

namespace QuickNotes.App_Start
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/scripts").Include("~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include("~/Scripts/angular.js", 
                                                                      "~/Scripts/angular-route.js", 
                                                                      "~/Scripts/ngClip.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css", "~/Content/bootstrap.css", 
                        "~/Content/bootstrap-theme.css"));
        }
    }
}