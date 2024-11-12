import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#003366',     // Deep blue
  accent: '#FFA500',      // Soft orange
  background: '#FAF9F6',  // Off-white
  textPrimary: '#1A1A1A', // Almost black
  textSecondary: '#4D4D4D', // Dark gray
  white: '#FFFFFF',       // White
  gray: '#cccccc',        // Same gray for neutral uses
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
