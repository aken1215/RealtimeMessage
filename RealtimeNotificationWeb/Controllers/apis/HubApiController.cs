using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using RealtimeNotificationWeb.Hubs;
using System;
using System.Web.Http;
using System.Web.Http.Description;

namespace RealtimeNotificationWeb.Controllers.apis
{
    public class HubApiController : ApiControllerWithHub<notificationHub>
    {
        /// <summary>
        /// Gets InfoModule item by id.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>InfoModule Item</returns>
        [HttpGet]
        [Route("SetNotification/{msg}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult SetNotification(string msg)
        {
            var subscribed = Hub.Clients.Group("A0A1").updateData(msg);
            return Ok();
        }
    }

    public abstract class ApiControllerWithHub<THub> : ApiController
     where THub : IHub
    {
        private Lazy<IHubContext> hub = new Lazy<IHubContext>(
            () => GlobalHost.ConnectionManager.GetHubContext<THub>()
        );

        protected IHubContext Hub
        {
            get { return hub.Value; }
        }
    }
}