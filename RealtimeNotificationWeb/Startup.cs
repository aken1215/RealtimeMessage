using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(RealtimeNotificationWeb.Startup))]
namespace RealtimeNotificationWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            //GlobalHost.DependencyResolver.UseRedis("192.168.12.52",6379,string.Empty,"myApp2");
            app.MapSignalR();


        }
    }
}
