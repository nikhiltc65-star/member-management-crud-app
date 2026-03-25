
import java.util.Scanner;

public class demo {
    public static void main(String[] args) {
           System.out.print("enter the value of the radius");
        Scanner sc = new Scanner(System.in);
       Double r = sc.nextDouble();
    

     Double  a=3.14*r*r;
     
     System.out.print("the area odf the circle is :"+a);
    }

}