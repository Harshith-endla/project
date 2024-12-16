public class sample {
    public static void main(String[] args) {
        int n = 5;  // Size of the triangle
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}

