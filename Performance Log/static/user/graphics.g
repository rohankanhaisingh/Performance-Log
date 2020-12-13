using Gram.SystemCollections(all);
using SocketIO;
using Gram.GraphicsContext;

namespace <graphics.g> :: @Load:Normal @StartClass:Main {
	default static class <Main> {

		ref GameObjects = new Array[];
		
		static class <GameObject> {
			constructor() {
				GameObject.Push(this);
			}
		}

		class <Cube> extends <GameObject> {
			constructor() {
				Super(this);
			}
		}

		action AddCube(name, entityName, textureName) {
			
		}

		// Start method
		action Start {
			public ref Scene = new GraphicsContent.Scene();

			for(ref i = 0; i < 10; i++) {
				AddCube("bruh", "bruh", "bruh");
			}
		}

		action Update[Async, ForceWaiting] {
			ref UpdateFrame = System.AnimationFrame(Update, {
				FramesPerSecond: auto
			});

			UpdateFrame.On("error", action(err) {
				Application.Exit("SIGNOUT").Before(action() {
					System.WriteFileSync("./errorlog.txt", "UTF-8", err.message);
					return;
				});
			});

		}
	}
}