public class Program
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Welcome to 'advanced' apartments maker!!!");

        Console.WriteLine("Choose apartment type? (A|B|C)"); //har ikke noe spesiell funksjon

        string apartmentType = Console.ReadLine().ToUpper();

        while (apartmentType != "A" && apartmentType != "B" && apartmentType != "C") //Hvis bruker skulle skrevet feil
        {
            Console.WriteLine("Please choose either A B or C");
            apartmentType = Console.ReadLine().ToUpper();
        }

        Apartment apartment = new Apartment(apartmentType);

        Start(apartment);

        // apartment type og hele objektet skrives ut 

        Console.WriteLine(""); // space
        Console.WriteLine($"Apartment type: {apartment.ApartmentType}");
        Console.WriteLine($"Rooms for apartment type {apartment.ApartmentType}: ");
        Console.WriteLine(""); // space

        foreach (var room in apartment.Rooms) //går gjennom vært rom
        {
            if (room is SpecialRoom gameRoom) //hvis rommet har GameRoom
            {
                Console.WriteLine($"{gameRoom.roomName}: {room.CalculateSize()}m2");
            }
            else //ellers viser vanlig rom
            {
                Console.WriteLine($"{room.roomName}: {room.CalculateSize()}m2");
            }
        }

        Console.WriteLine($"Apartment type {apartment.ApartmentType} has {apartment.Rooms.Count} rooms with a total size of {apartment.TotalSize} m2.");
        Console.WriteLine(""); // space

        //lager html fil under mappe "html"
        string htmlDirectory = Path.Combine(Directory.GetCurrentDirectory(), "html");
        Directory.CreateDirectory(htmlDirectory);
        string htmlFilePath = Path.Combine(htmlDirectory, $"{apartment.ApartmentType}.html");
        string htmlContent = GenerateHtmlContent(apartment);
        File.WriteAllText(htmlFilePath, htmlContent);
        Console.WriteLine($"File: {htmlFilePath}");
    }



    static string GenerateHtmlContent(Apartment apartment) //html 
    {
        string html = "<html><head><title>Aparments</title></head><body>";
        html += $"<h1>{apartment.ApartmentType}</h1><ul>"; // h1

        foreach (var room in apartment.Rooms)
        {
            if (room is SpecialRoom)
            {
                html += $"<li>{room.roomName}: {room.CalculateSize()}m2</li>";
            }
            else
            {
                html += $"<li>{room.roomName}: {room.CalculateSize()}m2</li>";
            }
        }

        html += $"</ul><p>Apartment type {apartment.ApartmentType} has {apartment.Rooms.Count} rooms with a total size of {apartment.TotalSize} m2.</p>";
        html += "</body></html>";

        return html;
    }


    static void Start(Apartment apartment)
    {
        string roomName;
        int roomLength;
        int roomWidth;

        Console.WriteLine("What is the name of the room?");
        roomName = Console.ReadLine();
        Console.WriteLine("What is the length of the room?");
        roomLength = Int32.Parse(Console.ReadLine());
        Console.WriteLine("What is the width of the room?");
        roomWidth = Int32.Parse(Console.ReadLine());

        Room room;

        switch (roomName)
        //hvis rommet er unikt lag et nytt objekt under en "arv" klasse
        //bruker switch fordi da kan man fortsette å lage flere spesielle type rom
        {
            case "GameRoom":
                room = new SpecialRoom(roomName, roomLength, roomWidth);
                break;
            // case "FunRoom": 
            // room = new SpecialRoom(roomName, roomLength, roomWidth);
            // break;
            default: //default lager rom som vanlig
                room = new Room(roomName, roomLength, roomWidth);
                break;
        }

        apartment.AddRoom(room);

        Console.WriteLine("Add another room? (y/n)"); //restarter funksjon og spør samme spørsmål. 
        if (Console.ReadLine().ToLower() == "y")
        {
            Start(apartment);
        }
    }
}

public class Apartment
{
    public string ApartmentType { get; set; } // navn på apartment
    public List<Room> Rooms { get; set; } = new List<Room>(); // liste av alle rommene i et aparment objekt
    public int TotalSize { get; private set; } = 0; // størrelse på alle rom (lengde * bredde)

    public Apartment(string apartmentType)
    {
        ApartmentType = apartmentType;
    }

    public void AddRoom(Room room)
    {
        Rooms.Add(room);
        TotalSize += room.roomWidth + room.roomLength; // TODO: ikke riktig output
    }
}

public class Room
{
    public string roomName { get; set; } // navnet til rommet
    public int roomLength { get; set; } // lengden på rommet
    public int roomWidth { get; set; } // bredden på rommet 

    public Room(string roomName, int roomLength, int roomWidth) // parent klasse
    {
        this.roomName = roomName;
        this.roomLength = roomLength;
        this.roomWidth = roomWidth;
    }

    public virtual int CalculateSize() // regner ut m2
    {
        return roomLength * roomWidth;
    }
}

public class SpecialRoom : Room //arv klasse
{
    public SpecialRoom(string roomName, int roomLength, int roomWidth) : base(roomName, roomLength, roomWidth)
    {
    }

    public override int CalculateSize() // overrider parent klassen med en ny formel
    {
        return roomLength * roomWidth * 2; // Legger til formelen
    }
}
