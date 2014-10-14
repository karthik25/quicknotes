using System.Web.Optimization;

namespace QuickNotes
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/scripts").Include("~/Scripts/bootstrap.js", "~/Scripts/ZeroClipboard.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include("~/Scripts/angular.js", "~/Scripts/angular-route.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css", "~/Content/bootstrap.css", 
                        "~/Content/bootstrap-theme.css", "~/Content/carousel.css"));
        }
    }
}