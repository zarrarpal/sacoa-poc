package com.reactnativehce.services;

import android.content.Context;
import android.content.SharedPreferences;
import android.nfc.cardemulation.HostApduService;
import android.os.Bundle;
import android.util.Log;

import com.reactnativehce.IHCEApplication;
import com.reactnativehce.apps.nfc.NFCTagType4;
import com.reactnativehce.utils.BinaryUtils;

import java.util.ArrayList;
import java.util.Arrays;

public class CardService extends HostApduService {
    private static final String TAG = "CardService";
    private static byte[] SELECT_APDU_HEADER = BinaryUtils.HexStringToByteArray("00A40400");
    private static final byte[] CMD_OK = BinaryUtils.HexStringToByteArray("9000");
    private static final byte[] CMD_ERROR = BinaryUtils.HexStringToByteArray("6A82");

    private ArrayList<IHCEApplication> registeredHCEApplications = new ArrayList<IHCEApplication>();
    private IHCEApplication currentHCEApplication = null;

    @Override
    public byte[] processCommandApdu(byte[] commandApdu, Bundle extras) {
      if (currentHCEApplication != null) {
        return currentHCEApplication.processCommand(commandApdu);
      }
      Log.d(TAG, "Command es: " + ByteArrayToHexString(commandApdu));

      byte[] header = Arrays.copyOfRange(commandApdu, 0, 4);

      SharedPreferences prefs = getApplicationContext()
        .getSharedPreferences("hce", Context.MODE_PRIVATE);

      String content = prefs.getString("content", "No text provided");      

      Log.d(TAG, "Command contenido es: " + content);
      return HexStringToByteArray(content);
      /*
      if (Arrays.equals(SELECT_APDU_HEADER, header)) {
        for (IHCEApplication app : registeredHCEApplications) {
          if (app.assertSelectCommand(commandApdu)) {
            currentHCEApplication = app;
            return HexStringToByteArray("25553047465050485648314d4a3f9000");
          }
        }
      }

      return CMD_ERROR;
      */
    }

    public static String ByteArrayToHexString(byte[] bytes) {
        final char[] hexArray = {'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'};
        char[] hexChars = new char[bytes.length * 2]; // Each byte has two hex characters (nibbles)
        int v;
        for (int j = 0; j < bytes.length; j++) {
            v = bytes[j] & 0xFF; // Cast bytes[j] to int, treating as unsigned value
            hexChars[j * 2] = hexArray[v >>> 4]; // Select hex character from upper nibble
            hexChars[j * 2 + 1] = hexArray[v & 0x0F]; // Select hex character from lower nibble
        }
        return new String(hexChars);
    }

    public static byte[] HexStringToByteArray(String s) throws IllegalArgumentException {
        int len = s.length();
        if (len % 2 == 1) {
            throw new IllegalArgumentException("Hex string must have even number of characters");
        }
        byte[] data = new byte[len / 2]; // Allocate 1 byte per 2 hex characters
        for (int i = 0; i < len; i += 2) {
            // Convert each character into a integer (base-16), then bit-shift into place
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i+1), 16));
        }
        return data;
    }

    @Override
    public void onCreate() {
      Log.d(TAG, "Starting service");

      SharedPreferences prefs = getApplicationContext()
        .getSharedPreferences("hce", Context.MODE_PRIVATE);

      String type = prefs.getString("type", "text");
      String content = prefs.getString("content", "No text provided");
      Log.d(TAG, "Content is:" + content);

      registeredHCEApplications.add(new NFCTagType4(type, content));
    }

    @Override
    public void onDeactivated(int reason) {
      Log.d(TAG, "Finishing service: " + reason);
    }
}
